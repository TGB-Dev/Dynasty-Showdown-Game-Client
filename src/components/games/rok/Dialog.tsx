import { Dialog, Flex, Text } from "@chakra-ui/react";
import { LuShield, LuSwords } from "react-icons/lu";
import { RxCheck, RxCross2 } from "react-icons/rx";
import CountDown from "./CountDown";

export default function DialogContent({
  type,
  open,
  handleOffDialog,
  handleNextScene,
  question,
  i,
  isAttack,
}: {
  type: keyof OpenState;
  open: OpenState;
  handleOffDialog: (dialog: keyof OpenState, callback?: () => void) => void;
  handleNextScene: () => void;
  question: Question[];
  i: number;
  isAttack?: boolean;
}) {
  const attack = isAttack ? "attack" : "defend";

  return (
    <Dialog.Root open={open[type]} size="full">
      <Dialog.Positioner>
        <Dialog.Content h="100%">
          <Flex
            h="100%"
            direction="column"
            justify="space-between"
            align="center"
            bg={
              type === "correct"
                ? "green.500"
                : type === "wrong"
                  ? "red.500"
                  : undefined
            }
            py={8}
            onClick={
              type !== attack
                ? () => handleOffDialog(type, () => handleNextScene())
                : undefined
            }
          >
            {type === attack && (
              <>
                <Text fontSize={13} fontWeight={400}>
                  {" "}
                </Text>
                <Flex justify="center" align="center">
                  {isAttack ? (
                    <LuSwords size={72} color="red" />
                  ) : (
                    <LuShield size={72} color="teal" />
                  )}
                  <Text
                    fontSize={24}
                    fontWeight={500}
                    color={isAttack ? "red" : "teal"}
                  >
                    {isAttack ? "Attack Turn" : "Defend Turn"}
                  </Text>
                </Flex>
                <CountDown
                  seconds={3}
                  color={isAttack ? "red" : "teal"}
                  callback={() => handleOffDialog(attack)}
                />
              </>
            )}
            {type === "correct" && (
              <>
                <CountDown
                  seconds={3}
                  color="white"
                  callback={() =>
                    handleOffDialog("correct", () => handleNextScene())
                  }
                />
                <Flex justify="center" align="center">
                  <Text fontSize={40} fontWeight={500} color="white">
                    Correct
                  </Text>
                  <RxCheck size={72} color="white" />
                </Flex>
                <Text fontSize={13} fontWeight={400} color="white">
                  Click anywhere to continue
                </Text>
              </>
            )}
            {type === "wrong" && (
              <>
                <CountDown
                  seconds={3}
                  color="white"
                  callback={() =>
                    handleOffDialog("wrong", () => handleNextScene())
                  }
                />
                <Flex justify="center" align="center">
                  <Text fontSize={40} fontWeight={500} color="white">
                    Incorrect
                  </Text>
                  <RxCross2 size={72} color="white" />
                </Flex>
                <Flex direction="column" align="center" gap={2}>
                  <Text fontSize={13} fontWeight={400} color="white">
                    Correct answer:
                  </Text>
                  <Text fontSize={16} fontWeight={500} color="white">
                    {question[i].answer}
                  </Text>
                  <Text fontSize={13} fontWeight={400} color="white">
                    Click anywhere to continue
                  </Text>
                </Flex>
              </>
            )}
          </Flex>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
