import { useROKStore } from "@/hooks/games/rok";
import { Box, Button, CloseButton, Dialog, Flex, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import CountDown from "./countDown";
import { LuBookMarked } from "react-icons/lu";
import { GoGraph } from "react-icons/go";

export default function Main() {
  const [open, setOpen] = useState({
    howToPlay: false,
    status: false,
  });

  const { setScene, turn, success, cities } = useROKStore();

  const handleNextScene = useCallback(() => {
    setScene("pick");
  }, [setScene]);

  return (
    <Flex
      direction="column"
      justify="space-between"
      align="center"
      w="100%"
      h="100vh"
      p={16}
    >
      {/* Some details */}
      <Text>Turn: {turn}</Text>
      <CountDown seconds={20} callback={handleNextScene} textSize={24} />
      <Flex
        direction="column"
        justify="center"
        align="center"
        w="100%"
        spaceY={6}
      >
        <Flex justify="center" align="center" w="100%" spaceX={4}>
          <Button onClick={() => setOpen({ ...open, howToPlay: true })}>
            How to play <LuBookMarked />
          </Button>
          <Button onClick={() => setOpen({ ...open, status: true })}>
            Status
            <GoGraph />
          </Button>
        </Flex>
        {/* Main Grid */}
        <Box
          w={{ base: "100%", sm: "85%", md: "75%" }}
          aspectRatio={1}
          border="2px solid black"
        ></Box>
      </Flex>

      <Text h="17.5%"> </Text>

      {/* How to play dialog */}
      <Dialog.Root
        open={open.howToPlay}
        onOpenChange={() => setOpen({ ...open, howToPlay: false })}
        size="cover"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content h="100%">
            <Dialog.CloseTrigger
              position="absolute"
              top="2"
              insetEnd="2"
              asChild
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Flex
              h="100%"
              direction="column"
              justify="space-between"
              align="center"
              py={16}
            >
              <Flex
                direction="column"
                justify="center"
                align="center"
                spaceY={4}
              >
                <Text fontSize={{ base: 24, md: 32 }} fontWeight={600}>
                  Rise of kingdom
                </Text>
                <Text
                  fontSize={{ base: 14, md: 20 }}
                  fontWeight={300}
                  lineHeight={1.5}
                  textAlign="center"
                  px={12}
                >
                  A strategy game where you can build your own kingdom
                </Text>
              </Flex>
              <Flex
                w="100%"
                h="50%"
                direction="column"
                justify="center"
                align="center"
              >
                Some demo pictures here
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      {/* Status dialog */}
      <Dialog.Root
        open={open.status}
        onOpenChange={() => setOpen({ ...open, status: false })}
        size="cover"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content h="100%">
            <Dialog.CloseTrigger
              position="absolute"
              top="2"
              insetEnd="2"
              asChild
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Flex
              h="100%"
              direction="column"
              justify="space-between"
              align="center"
              py={16}
            >
              {turn !== 1 ? (
                <>
                  <Text>Last Turn: {turn - 1}</Text>
                  <Text>Attack: {success.attack ? "Win" : "Lose"}</Text>
                  <Text>Defend: {success.defend ? "Win" : "Lose"}</Text>
                  <Text>
                    City taken:{" "}
                    {
                      cities
                        .flat()
                        .filter((city) => city.ownedBy === "Your teamm").length
                    }
                  </Text>
                  <Text>City lose: 0</Text>
                </>
              ) : (
                <Text>No previous turns</Text>
              )}
            </Flex>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Flex>
  );
}
