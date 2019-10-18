import React from 'react';
import {Card} from "../../components";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

function Counter(props) {
    return (
        <p style={{
            margin: '14px',
            textAlign: 'center',
            color: 'var(--primary-color)',
            fontSize: 35,
            fontWeight: 'bold',
        }}>
            <Link to={props.link}>{props.count ? props.count : 0}</Link>
        </p>
    )
}

class ResumeView extends React.Component {
    render() {

        return (
            <React.Fragment>
                <Helmet title={"Inicio Dragon"}/>
                <div className="pure-g">
                    <div className="pure-u-1-2">
                        <Card style={{width: 200, margin: '24px auto'}} title={"Profesores"}>
                            <Counter count={50}/>
                        </Card>
                    </div>
                    <div className="pure-u-1-2">
                        <Card style={{width: 200, margin: '24px auto'}} title={"Alumnos"}>
                            <Counter count={50}/>
                        </Card>
                    </div>
                    <div className="pure-u-1-2">
                        <Card style={{width: 200, margin: '24px auto'}} title={"Materias"}>
                            <Counter count={50}/>
                        </Card>
                    </div>
                    <div className="pure-u-1-2">
                        <Card style={{width: 200, margin: '24px auto'}} title={"Grupos"}>
                            <Counter count={50}/>
                        </Card>
                    </div>
                    <div className="pure-u-1-2">
                        <Card style={{width: 200, margin: '24px auto'}} title={"Carreras"}>
                            <Counter count={50}/>
                        </Card>
                    </div>
                    <div className="pure-u-1-2">
                        <Card style={{width: 200, margin: '24px auto'}} title={"Resultados"}>
                            <Counter count={50}/>
                        </Card>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ResumeView;
