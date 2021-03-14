const Item = ({
  icon,
  title,
  status,
  statusStyle,
  onEditClick,
  onDeleteClick,
}) => (
  <div
    className={`flex flex-row place-content-between p-2 border-l-8 border rounded-md my-2 ${statusStyle}`}
  >
    <div className="flex flex-row place-content-evenly">
      <span className="mr-4 my-auto">{icon}</span>
      <span className="mr-4 my-auto text-lg text-indigo-900 font-medium">
        {title}
      </span>
    </div>
    <div>
      {status}
      <button id="edit" className="mx-3 my-auto" onClick={onEditClick}>
        &#9997;
      </button>
      <button id="delete" className="mx-3 my-auto" onClick={onDeleteClick}>
        &#10005;
      </button>
    </div>
  </div>
);

export default Item;
