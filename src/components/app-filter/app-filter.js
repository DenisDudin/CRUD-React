import "./app-filter.css";

const AppFilter = (props) => {
    const btnsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'rise', label: 'На повышение'},
        {name: 'more1000', label: 'З/П больше 1000$'},
    ];
    const btns = btnsData.map(({name, label}) => {
        const activeBtn = props.filter === name;
        const clazz = activeBtn ? 'btn-light' : 'btn-outline-light';

        return (
            <button type="button"
                className={`btn ${clazz}`}
                key={name}
                onClick={() => props.onFilterSelect(name)}>   
                {label}
            </button>
        )
    });

    return (
        <div className="btn-group">
            {btns}
        </div>
    )
}

export default AppFilter;