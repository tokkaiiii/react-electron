import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Message } from '../../interface/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentMessageRef = useRef<string>('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      role: 'user',
      content,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    currentMessageRef.current = '';ㄴ

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          session_id: 'abc123',
        }),
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '',
      }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(5));
              if (data.content) {
                currentMessageRef.current += data.content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: currentMessageRef.current,
                  };
                  return newMessages;
                });
              }
            } catch (e) {
              console.error('Failed to parse SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      currentMessageRef.current = '';
    }
  };

  return (
    <Container>
      <Header>
        <Title>리액트 쿼리 챗봇</Title>
        <HomeButton onClick={() => window.location.href = '/'}>
          홈으로
        </HomeButton>
      </Header>
      <MessagesContainer>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && <LoadingIndicator>답변을 생성하는 중...</LoadingIndicator>}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  background-color: #007AFF;
  padding: 16px;
  color: white;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const HomeButton = styled.button`
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  -webkit-app-region: no-drag;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  color: #666;
  padding: 8px;
  font-style: italic;
`;