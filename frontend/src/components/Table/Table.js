import { useEffect, useState } from "react"
import './Table.css'
import { Link } from "react-router-dom"

const Table = ({ loadData, loadTableSettings, checkBox }) => {

    const [data, setData] = useState(null)
    const [tableSetting, setTableSetting] = useState(null)

    // pobierz listę ID wybranych urządzeń (przez checkbox)
    const getSelectedId = () => {
        return data.filter(dataRow => dataRow.checkbox === true).map(dataRow => dataRow.id)
    }

    // obsługa zaznaczenia checkbox
    const checkBoxChangeHandler = (id) => {
        setData(data.map(dataRow => dataRow.id === id ? { ...dataRow, checkbox: !dataRow.checkbox } : dataRow))
    }

    // zmiana strony 
    const changePage = (newPage) => {
        setTableSetting({ ...tableSetting, page: newPage })
    }

    //zmiana stanów po wpisaniu danych do pól do filtrowania
    const inputFilterHandler = (dataName, value) => {
        //console.log("inputFilterHandler: ", dataName, value);
        const tempColumns = tableSetting.columns.map(column => column.dataName === dataName ? { ...column, filters: value } : column)
        setTableSetting({ ...tableSetting, columns: tempColumns })
    }

    // filtrowanie danych
    const filterData = () => {
        let filteredData = ([...data])

        tableSetting.columns.forEach(column => {
            if (column.filters) {
                //console.log('filterData column.filter: ', column.filters, column.dataName)
                if (column.dataName === "checkbox") {
                    if (column.filters === true) {
                        //console.log("FilterData checbox true");
                        filteredData = filteredData.filter((dataRow) => dataRow[column.dataName] === column.filters)
                    }
                } else {
                    filteredData = filteredData.filter((dataRow) => dataRow[column.dataName]
                        .toLowerCase()
                        .includes(column.filters.toLowerCase()))
                }
            }
        })
        return filteredData
    }

    // sortowanie danych po kolumnie
    const sortData = (key) => {
        const dataToSort = [...data]
        if (key === tableSetting.sort.key) tableSetting.sort.reverse = !tableSetting.sort.reverse
        else { tableSetting.sort.reverse = false; tableSetting.sort.key = key }
        dataToSort.sort((a, b) => {
            if (tableSetting.sort.reverse) return a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1
            else return a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1

        })
        setData(dataToSort)
    }

    //console.log(loadDataHandler());
    //console.log(data);

    useEffect(() => {
        const checkBoxColumn = [{
            id: 0,
            header: "[ ]",
            dataName: "checkbox",
            width: "30px"
        }]
        // ładowanie ustawieni tabeli oraz danych
        const initialLoading = async () => {
            //załaduj ustawienia tablicy (kolumny nagłówki itp)
            loadTableSettings().then(response => {
                //console.log("loadTableSettings.response", response)
                // jeżeli nie ma danych na temat kolumn to nie wykonuj dalej
                if (!response.columns) return alert("Table.js: brakuje danych na temat kolumn")
                setTableSetting({
                    page: 0,
                    maxOnPage: response.maxOnPage ? response.maxOnPage : 30,
                    rowHeight: response.rowHeight ? response.rowHeight : 25,
                    columns: checkBox ? checkBoxColumn.concat(response.columns) : response.columns,
                    sort: { key: null, reverse: false }
                })
                //console.log("checkBox", checkBox ? checkBox : false);
                const columns = (response.columns.map((column) => column.dataName))
                //console.log("columns: " + columns);
                //załaduj dane do tabeli
                loadData(columns).then(response => {
                    //console.log("loadData.response", response);
                    if (!response) return alert("Table.js: brakuje danych do zasilenie tabeli")
                    setData(response)
                })
            })
        }

        initialLoading();
    }, [])

    if (!tableSetting || !data) {
        return (
            <div>
                <h1>BRAK DANYCH</h1>
            </div>
        )
    }

    return (
        <div className="Table">
            <table >
                <TableHeader
                    tableSetting={tableSetting}
                    inputFilterHandler={(dataName, value) => inputFilterHandler(dataName, value)}
                    sortDataChandler={(e) => sortData(e)}
                />
                <TableBody
                    data={filterData().slice(tableSetting.page * tableSetting.maxOnPage, (tableSetting.page + 1) * tableSetting.maxOnPage)}
                    tableColumnsInfo={tableSetting.columns}
                    checkBoxChangeHandler={checkBoxChangeHandler}
                />
            </table>
            <TableFooter
                numberOfPages={filterData().length / tableSetting.maxOnPage}
                activePage={tableSetting.page}
                changePage={(newPage => changePage(newPage))}
            />
            {/* <button style={{ width: "50px" }} onClick={() => sortData('location_local')}>TEST</button>
            {console.log("3", data)}
            {console.log("4", tableSetting)} */}
        </div>
    )
}

const TableHeader = ({ tableSetting, inputFilterHandler, sortDataChandler }) => {
    return (
        <thead>
            <HeaderNames tableSetting={tableSetting} sortDataChandler={sortDataChandler} />
            <HeaderInput tableColumnsInfo={tableSetting.columns} inputFilterHandler={inputFilterHandler} />
        </thead>
    )
}

const HeaderNames = ({ tableSetting, sortDataChandler }) => {
    let arrow = <></>
    console.log('ar', tableSetting.sort);
    tableSetting.sort.reverse ? arrow = <> &#8595;</> : arrow = <> &#8593;</>
    // console.log(arrow);
    return (
        <tr className="HeaderName">
            {tableSetting.columns.map(columnInfo => <HeaderNameCell
                key={columnInfo.dataName}
                text={columnInfo.header}
                width={columnInfo.width}
                arrow={tableSetting.sort.key === columnInfo.dataName ? arrow : ""}
                sortDataChandler={() => sortDataChandler(columnInfo.dataName)} />)}
        </tr>
    )
}

const HeaderNameCell = ({ text, width, arrow, sortDataChandler }) => {
    return (
        <th style={{ width: width }} onClick={() => sortDataChandler()}>
            {text} {arrow}
        </th>
    )
}

const HeaderInput = ({ tableColumnsInfo, inputFilterHandler }) => {
    return (
        <tr className="HeaderInput">
            {tableColumnsInfo.map(column => <HeaderInputCell
                type={column.dataName === "checkbox" ? "checkbox" : "text"}
                key={column.dataName}
                value={column.value}
                changeHandler={(newValue) => inputFilterHandler(column.dataName, newValue)} />)}
        </tr>
    )
}

const HeaderInputCell = ({ value, changeHandler, type }) => {
    return (
        <td>
            <input
                type={type}
                onChange={e => changeHandler(type === 'checkbox' ? e.target.checked : e.target.value)}
                value={value}
            />
        </td>
    )
}

const TableBody = ({ data, tableColumnsInfo, checkBoxChangeHandler }) => {
    //console.log("TableBody: ", data);
    //const temp = devicesData.slice(tableSetting.page * tableSetting.maxOnPage, (tableSetting.page + 1) * tableSetting.maxOnPage);
    return (
        <tbody>
            {data.map(dataRow => <DataRow
                key={dataRow.id}
                data={dataRow}
                tableColumnsInfo={tableColumnsInfo}
                checkBoxChangeHandler={() => checkBoxChangeHandler(dataRow.id)}
            />)}
        </tbody>
    )
}

const DataRow = ({ data, tableColumnsInfo, checkBoxChangeHandler }) => {
    //console.log("DataRow: ", data.checkBox);
    return (
        <tr>
            {tableColumnsInfo.map(column => <DataCell
                key={column.dataName}
                type={column.dataName === "checkbox" ? "checkbox" : "text"}
                value={column.linkTo
                    ? <Link to={"/device"} state={{ id: data[column.dataName] }}>{data[column.dataName]}</Link>
                    : data[column.dataName]
                }
                checkBoxChangeHandler={column.dataName === "checkbox" ? checkBoxChangeHandler : null}
                checkbox={data.checkbox ? data.checkbox : false}
            />)}
        </tr>
    )
}

const DataCell = ({ value, type, checkbox, checkBoxChangeHandler }) => {
    //console.log("DataCell: ", linkTo);
    return (
        type === "checkbox"
            ? <td className={checkbox ? "Selected" : ""}> <input
                type={type}
                //style={{ height: height }}
                checked={checkbox}
                onChange={e => checkBoxChangeHandler()}
                value={value}
            /></td>
            : <td className={checkbox ? "Selected" : ""} >{value}</td>
    )

}

const TableFooter = ({ numberOfPages, activePage, changePage }) => {
    numberOfPages = Math.floor(numberOfPages)
    const buttons = []
    const nextPage = activePage + 1 > numberOfPages ? numberOfPages : activePage + 1
    const previousPage = activePage - 1 < 0 ? 0 : activePage - 1

    for (let i = 0; i <= numberOfPages; i++) {
        const text = i === activePage ? "[" + i + "]" : i
        buttons.push(<button className="NumberButton" key={i} onClick={() => changePage(i)}>{text}</button>)
    }

    return (
        <div className="TableFooter">
            Strona {activePage} z {numberOfPages}
            <button className="ArrowButton" onClick={() => changePage(previousPage)}>{"<"}</button>
            {buttons}
            <button className="ArrowButton" onClick={() => changePage(nextPage)}>{">"}</button>
        </div>
    )
}

export default Table