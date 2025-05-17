import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../shared/constants/styles';

export const TypeBadge = ({ type }: { type: string }) => (
  <Badge style={{ backgroundColor: colors.type[type] || colors.gray }}>
    <BadgeText>{type}</BadgeText>
  </Badge>
);

const Badge = styled.View`
  padding: 6px 12px;
  border-radius: 20px;
  margin-right: 8px;
`;

const BadgeText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-transform: capitalize;
`;
