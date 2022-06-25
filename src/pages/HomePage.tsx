import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth()

    return (
      <div className="HomePage">
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h3>
            Seja bem vindo(a), {<span>{user?.email}</span>}!
          </h3>
        </div>
      </div>
    );
}
