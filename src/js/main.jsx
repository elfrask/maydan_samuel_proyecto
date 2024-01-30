

class App extends React.Component {
    render() {

        return(
            <div className="">
                <div className="header">
                    
                    <Button
                    img="/src/img/logo.png"
                    click={() => {
                        document.location.reload()
                    }}
                    size="75px"
                    className=""
                    ></Button>
                    
                    <h2 className="l" style={{paddingLeft:"10px"}}>
                        Notas de estudiantes
                    </h2>
                </div>
                
                <div className="bodypage imgbg" style={[{backgroundImage:`url("/src/img/bgs/bg-body2.jpg")`},{}][0]}>
                    <div className="page bg-use-color">

                        <div className="subhead">

                            <div className="search" style={{width:"100%", maxWidth:"800px"}}>
                                <input type="text" placeholder="buscar por nombre o cedula" className="search-input" />
                            </div>
                        </div>
                        <div className="subbody list-db">
                            <Dbcard title = "Primer Año" img = "/src/img/gui/notas.png"/>
                            <Dbcard title = "Segundo Año" img = "/src/img/gui/notas.png"/>
                            <Dbcard title = "Tercer Año" img = "/src/img/gui/notas.png"/>
                            <Dbcard title = "Cuarto Año" img = "/src/img/gui/notas.png"/>
                            <Dbcard title = "Quinto Año" img = "/src/img/gui/notas.png"/>
                            <Dbcard title = "Sexto Año" img = "/src/img/gui/notas.png"/>
                            
                        </div>
                        <br /><br />
                    </div>
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