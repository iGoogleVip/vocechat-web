import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import StyledRadio from "../../../common/component/styled/Radio";
import StyledButton from "../../../common/component/styled/Button";
import { useGetLoginConfigQuery, useUpdateLoginConfigMutation } from "../../../app/services/server";

const StyledInviteRuleStep = styled.div`
 height: 100%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;

 > .input:not(:nth-last-child(2)) {
  margin-bottom: 20px;
 }
`;

export default function InviteRuleStep({ step, setStep }) {
 const { data: loginConfig } = useGetLoginConfigQuery();
 const [updateLoginConfig, { isSuccess, error }] = useUpdateLoginConfigMutation();

 const [value, setValue] = useState(null);

 // Display error
 useEffect(() => {
  if (error === undefined) return;
  toast.error(`Failed to update invitation rule: ${error.data}`);
 }, [error]);

 // Increment `step` when updating has completed
 useEffect(() => {
  if (isSuccess) setStep(step + 1);
 }, [isSuccess]);

 return (
  <StyledInviteRuleStep>
   <span className="primaryText">Last step: invite others!</span>
   <span className="secondaryText">Firstly, who can sign up to this server?</span>
   <StyledRadio
    options={["Everyone", "Invitation link only"]}
    value={value}
    onChange={(v) => {
     setValue(v);
     if (loginConfig !== undefined) {
      const whoCanSignUp = ["EveryOne", "InvitationOnly"][v];
      updateLoginConfig({
       ...loginConfig,
       who_can_sign_up: whoCanSignUp
      });
     }
    }}
   />
   <StyledButton className="button border_less ghost" onClick={() => setStep(step + 1)}>
    Skip
   </StyledButton>
  </StyledInviteRuleStep>
 );
}
