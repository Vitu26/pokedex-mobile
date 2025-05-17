import React from 'react';
import styled from 'styled-components/native';

type Props = {
  label: string;
  value: number;
};

export const StatBar = ({ label, value }: Props) => (
  <StatContainer>
    <StatLabel>{label}</StatLabel>
    <BarBackground>
      <BarFill style={{ width: `${Math.min(value, 100)}%` }} />
    </BarBackground>
    <StatValue>{value}</StatValue>
  </StatContainer>
);

const StatContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

const StatLabel = styled.Text`
  width: 100px;
  font-size: 14px;
`;

const BarBackground = styled.View`
  flex: 1;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-right: 8px;
`;

const BarFill = styled.View`
  height: 8px;
  background-color: #64C864;
  border-radius: 4px;
`;

const StatValue = styled.Text`
  width: 32px;
  text-align: right;
`;
