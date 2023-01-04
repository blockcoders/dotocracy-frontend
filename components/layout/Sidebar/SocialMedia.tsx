import { HStack } from "@chakra-ui/react";
import { VscGithub } from "react-icons/vsc";
import { TbWorld } from "react-icons/tb";
import { BsTelegram, BsTwitter } from "react-icons/bs";
import Link from "next/link";

const FONT_SIZE = 24;

export const SocialMedia = () => {
  return (
    <HStack justifyContent="center" px={2} py={4} gap={4}>
      <Link href="https://github.com/blockcoders/polkadot-hackathon">
        <VscGithub fontSize={FONT_SIZE} />
      </Link>
      <Link href="https://blockcoders.io/">
        <TbWorld fontSize={FONT_SIZE} />
      </Link>
      <Link href="https://twitter.com/blockcoders_">
        <BsTwitter fontSize={FONT_SIZE} />
      </Link>
      <Link href="https://t.me/blockcoderstg">
        <BsTelegram fontSize={FONT_SIZE} />
      </Link>
    </HStack>
  );
};
