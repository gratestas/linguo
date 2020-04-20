import React from 'react';
import styled from 'styled-components';
import { useWeb3React } from '~/app/web3React';
import SingleCardLayout from '~/pages/layouts/SingleCardLayout';
import RequiredWalletGateway from '~/components/RequiredWalletGateway';
import WithRouteMessage from '~/components/WithRouteMessage';
import TranslationRequestForm from './TranslationRequestForm';

const StyledOverlayWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const StyledOverlay = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  background-color: ${props => props.theme.hexToRgba('#fff', 0.5)};
  cursor: not-allowed;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
`;

const StyledContentWrapper = styled.div`
  filter: ${props => (props.disabled ? 'blur(1px)' : 'none')};
`;

function TranslationRequest() {
  const { account } = useWeb3React();
  const formBlocked = !account;

  const form = (
    <StyledOverlayWrapper>
      <StyledContentWrapper disabled={formBlocked}>
        <TranslationRequestForm />
      </StyledContentWrapper>
      <StyledOverlay visible={formBlocked} />
    </StyledOverlayWrapper>
  );

  return (
    <SingleCardLayout title="New Translation">
      <WithRouteMessage>
        <RequiredWalletGateway
          message="To request a translation you need an Ethereum wallet."
          missing={form}
          error={form}
        >
          {form}
        </RequiredWalletGateway>
      </WithRouteMessage>
    </SingleCardLayout>
  );
}

export default TranslationRequest;