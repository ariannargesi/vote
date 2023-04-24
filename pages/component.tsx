import Button from "@/features/Button";
import { ToastContainer, toast } from "react-toastify";

export default function Component (props) {

    const notify = () => toast("Wow so easy!");

    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    );
}