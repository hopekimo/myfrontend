import { createBrowserHistory as createHistory } from 'history'
const history = createHistory()

const navigate = to => {
    console.log("history to => " + to);
    console.log("history => " + history);
    history.push(to);
}
export { history, navigate }