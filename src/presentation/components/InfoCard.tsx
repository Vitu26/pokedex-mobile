import React from 'react';
import styled from 'styled-components/native';

type Props = {
  label: string;
  value: string;
};

export const InfoCard = ({ label, value }: Props) => (
  <Card>
    <InfoValue>{value}</InfoValue>
    <InfoLabel>{label}</InfoLabel>
  </Card>
);

const Card = styled.View`
  background-color: #fff;
  padding: 12px 16px;
  border-radius: 12px;
  align-items: center;
  elevation: 2;
  margin: 0 6px;
`;

const InfoValue = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const InfoLabel = styled.Text`
  font-size: 12px;
  color: #6c757d;
`;
