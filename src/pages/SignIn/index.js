import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";
import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
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
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ error: "Preencha usuário e senha para continuar!" });
    } else {
      try {
        // api.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        // api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        // api.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE';
        api.defaults.headers.post['Access-Control-Allow-Headers'] = 'OPTIONS,Accept,Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Header';

        const response = await api.post("/User/authenticate", { 'username': username, 'password': password }, config);

        login(response.data.token);
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
          {<h3>Nova plataforma de cotações de apólices.</h3>}
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Usuário"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Link to="/forgot">Esqueceu sua senha ?</Link>
          <hr />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Sou novo aqui</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);
