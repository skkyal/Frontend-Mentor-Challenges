import smallTick from "../assets/images/icon-list.svg";
export default function ListItem({ text }) {
  return (
    <div className="list-items">
      <div className="small-tick">
        <img alt="" src={smallTick} />
      </div>
      <div> {text}</div>
    </div>
  );
}
