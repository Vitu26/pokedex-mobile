import React from 'react';
import styled from 'styled-components/native';

type Props = {
  id: string;
  name: string;
  isSelected?: boolean;
  onPress: () => void;
};

export const ListItem = ({ id, name, isSelected = false, onPress }: Props) => {
  return (
    <ItemButton onPress={onPress} isSelected={isSelected} activeOpacity={0.7}>
      <TextWrapper>
        <ItemId>No. {id.padStart(3, '0')}</ItemId>
        <ItemName>{capitalize(name)}</ItemName>
      </TextWrapper>
    </ItemButton>
  );
};

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const ItemButton = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 12px;
  background-color: ${({ isSelected }) => (isSelected ? '#ffe7b2' : '#ffffff')};
  border: 2px solid ${({ isSelected }) => (isSelected ? '#ff5a36' : '#ddd')};
`;

const TextWrapper = styled.View`
  flex-direction: column;
`;

const ItemId = styled.Text`
  font-size: 13px;
  color: #555;
`;

const ItemName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-transform: capitalize;
`;
