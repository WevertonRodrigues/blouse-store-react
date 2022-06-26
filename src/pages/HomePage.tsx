import { useAppSelector } from "../store";
import { selectUser } from "../store/user";

export default function HomePage() {
    const user = useAppSelector(selectUser)

    return (
      <div className="HomePage">
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h3>
            Seja bem vindo(a), {<span>{user?.name}</span>}!
          </h3>
        </div>
      </div>
    );
}
