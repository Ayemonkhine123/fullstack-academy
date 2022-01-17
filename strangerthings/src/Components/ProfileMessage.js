// {
//     "_id": "5e8d1f2539e7a70017a7c968",
//     "post": {
//         "_id": "5e8d1f2539e7a70017a7c964",
//         "title": "Practically new Stradivarius"
//     },
//     "fromUser": {
//         "_id": "5e8d1f2539e7a70017a7c962",
//         "username": "jane1234"
//     },
//     "content": "I am very much in the market for a fine violin."
// },

const Message = ({ type, msgInfo }) => {
  const HEADER =
    type === "tome" ? `From: ${msgInfo?.fromUser?.username}` : "(Sent By Me)";
  const POST_LABEL = type === "tome" ? "VIEW MY POST" : "MESSAGE AGAIN";

  return (
    <div className="profile-message-wrapper">
      <header className="profile-message-header">{HEADER}</header>
      <p className="profile-message-content">{msgInfo?.content}</p>
      <a href={`/posts/${msgInfo?.post?._id}`} className="profile-message-link">
        <p>
          <span className="profile-message-link-bold">{POST_LABEL}: </span>
          <span>{msgInfo?.post?.title}</span>
        </p>
      </a>
    </div>
  );
};

export default Message;
