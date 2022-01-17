import { useState, useEffect } from "react";
import { Message } from "../Components";
const Profile = ({ userInfo }) => {
  const [messagesFromMe, setMessagesFromMe] = useState([]);
  const [messagesToMe, setMessagesToMe] = useState([]);

  const getMessages = (messages = [], userId) => {
    const toMe = [];
    const fromMe = [];
    messages.forEach((msg) => {
      const {
        fromUser: { _id },
      } = msg;
      if (_id === userId) {
        fromMe.push(msg);
      } else {
        toMe.push(msg);
      }
    });
    return {
      toMe,
      fromMe,
    };
  };

  useEffect(() => {
    const { toMe, fromMe } = getMessages(userInfo?.messages);
    setMessagesFromMe(fromMe);
    setMessagesToMe(toMe);
  }, [userInfo]);

  return (
    <div>
      <div>
        <h4>{userInfo?.username}</h4>
        <h3> Message To Me:</h3>
        {messagesToMe.map((msg, index) => (
          <Message
            type="tome"
            msgInfo={msg}
            key={`profile_${index}_${msg?._id}`}
          />
        ))}
      </div>
      <div>
        <h3> Messages from Me:</h3>
        {messagesFromMe.map((msg, index) => (
          <Message
            type="frome"
            msgInfo={msg}
            key={`profile_${index}_${msg?._id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
