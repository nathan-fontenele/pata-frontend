import AuthScreen from "../components/AuthScreen";
import { isAuth0Configured } from "../../lib/auth0";

export const dynamic = "force-dynamic";

export default function CreateAccountPage() {
  return <AuthScreen mode="signup" authConfigured={isAuth0Configured()} />;
}
