import { useState, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <InputContainer>
      <StyledTextArea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="질문을 입력하세요"
        disabled={isLoading}
      />
      <SendButton onClick={handleSend} disabled={isLoading || !input.trim()}>
        전송
      </SendButton>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  padding: 16px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
`;

const StyledTextArea = styled.textarea`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  resize: none;
  font-size: 14px;
  min-height: 40px;
  max-height: 120px;
  margin-right: 8px;

  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

const SendButton = styled.button`
  padding: 0 20px;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;