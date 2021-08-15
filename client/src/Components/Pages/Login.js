import footer_login from "../../Images/footer_login.svg";
import useLogin from "../Hooks/Auth/useLogin";
import useCurrentUser from "../Hooks/User/useCurrentUser";
import { setToken } from "../Helpers/token";
import {
  Image,
  Button,
  Form,
  Typography,
  Layout,
  Input,
  InputPassword,
} from "tiny-ui";
import { Link, useLocation, useHistory } from "react-router-dom";

export default function Login() {
  const { state } = useLocation();
  const { push } = useHistory();
  const { setUser } = useCurrentUser();
  const login = useLogin();
  const initialValues = { email: state?.email || "", password: "" };

  const handleSubmit = async (values) => {
    const res = await login.mutateAsync(values);
    if (res.ok) {
      setToken(res?.data?.token);
      setUser(res?.data?.user);
      push("/dashboard");
    }
  };

  return (
    <Layout>
      <Layout.Content
        className="fadeIn radius-4"
        style={{
          maxWidth: "610px",
          margin: "auto",
          marginTop: "10rem",
          padding: "0 1rem",
        }}
      >
        <Typography.Heading level={2} align="center">
          Iniciar sesión
        </Typography.Heading>
        <Typography.Paragraph align="center">
          Necesitas una cuenta para acceder al contenido
        </Typography.Paragraph>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={initialValues}
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: "El e-mail es obligatorio" }]}
          >
            <Input maxLength="100" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            helper="La contraseña debe tener 6-20 carácteres"
            rules={[{ required: true, message: "La clave es obligatoria" }]}
          >
            <InputPassword maxLength="20" minLength="6" />
          </Form.Item>

          <Button
            type="submit"
            btnType="primary"
            style={{ background: "#4127c1" }}
            loading={login.isLoading}
            disabled={login.isLoading}
            block
          >
            Iniciar
          </Button>
          <Link to="/signup" title="Si no tienes cuenta, ¡creala en segundos!">
            <Button btnType="link" block>
              Crea tu cuenta
            </Button>
          </Link>
        </Form>
      </Layout.Content>
      <Image
        src={footer_login}
        width="100%"
        height="550px"
        style={{ position: "absolute", left: 0, bottom: 0, zIndex: -1 }}
      />
    </Layout>
  );
}