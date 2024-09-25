import style from "./ServiceTable.module.css"

export default function ConnectionPropertiers(props) {
    return (
        <div className={style.popup}>
            <div className={style.popupHead}>
                <div className={style.popupTitle}>Connection Properties</div>
                <div className={style.popupClose} onClick={() => props.setConnPropOpen(false)}>Close</div>
            </div>
            <div className={style.popupBody}>
                <table>
                    <tbody>
                        {
                            Object.keys(JSON.parse(props.connProperties)).map((key, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{key}</td>
                                        <td>{JSON.parse(props.connProperties)[key]}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div >
        </div >
    );
}