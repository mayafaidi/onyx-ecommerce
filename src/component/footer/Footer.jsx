import React from "react";
import {
  Footer as FlowFooter,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

export default function Footer() {
  return (
    <FlowFooter container>
      <div className="w-full text-center bg-[#070e25ff] text-white py-6">
        <FooterCopyright href="#" by="Onyx™" year={2025} />
        <FooterLinkGroup className="mt-2 flex justify-center gap-4">
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Licensing</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinkGroup>
      </div>
    </FlowFooter>
  );
}
