

class App extends React.Component {
    render() {

        return(
            <div className="page">
                <div className="header">

                </div>
                <div className="bodypage">

                </div>
            </div>
        )
    }
};


ReactDOM.render(
    <App></App>,
    document.body,
    () => {
        console.log("app is started")
    }
)