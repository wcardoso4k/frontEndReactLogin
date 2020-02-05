import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import { Form, Container } from "./styles";

class Forgot extends Component {
    state = {
        username: "",
        error: ""
    };

    handleSignIn = async e => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        e.preventDefault();
        const { username } = this.state;
        if (!username) {
            this.setState({ error: "Preencha usuário para continuar!" });
        } else {
            try {
                // api.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
                // api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
                // api.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE';
                api.defaults.headers.post['Access-Control-Allow-Headers'] = 'OPTIONS,Accept,Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Header';

                const response = await api.get("/User/forgot?username=" + username, config);
                console.log(response);
                this.props.history.push("/app");
            } catch (err) {
                this.setState({
                    error:
                        "Houve um problema com o login, verifique suas credenciais."
                });
            }
        }
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSignIn}>
                    <h3>Esqueceu sua senha ?</h3>
                    {this.state.error && <p>{this.state.error}</p>}
                    <input
                        type="text"
                        placeholder="Usuário"
                        onChange={e => this.setState({ username: e.target.value })}
                    />
                    <hr />
                    <button type="submit">Enviar</button>
                    <hr />
                </Form>
            </Container>
        );
    }
}

export default withRouter(Forgot);
