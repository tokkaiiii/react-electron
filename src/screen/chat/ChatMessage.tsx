import styled from 'styled-components';
import { Message } from '../../interface/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <MessageContainer isUser={isUser}>
      <MessageBubble isUser={isUser}>
        <MessageText isUser={isUser}>{message.content}</MessageText>
      </MessageBubble>
    </MessageContainer>
  );
}

const MessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin: 8px;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  background-color: ${props => props.isUser ? '#007AFF' : '#E9ECEF'};
  padding: 12px 16px;
  border-radius: 16px;
  max-width: 80%;
`;

const MessageText = styled.p<{ isUser: boolean }>`
  color: ${props => props.isUser ? '#FFFFFF' : '#000000'};
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
`;