import React from 'react';
import styled from 'styled-components/native';

export const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <SectionContainer>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </SectionContainer>
);

const SectionContainer = styled.View`
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`;
