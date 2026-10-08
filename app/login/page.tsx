import AuthScreen from "../components/AuthScreen";
import { isAuth0Configured } from "../../lib/auth0";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return <AuthScreen mode="login" authConfigured={isAuth0Configured()} />;
}
