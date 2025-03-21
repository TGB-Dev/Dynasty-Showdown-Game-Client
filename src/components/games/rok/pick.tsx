import { useEffect, useState } from "react";
import { useROKStore } from "@/hooks/games/rok";
import { Flex, Grid, Box, Button, Text } from "@chakra-ui/react";

export default function Pick() {
  const { cities, selectedCity, setSelectedCity, setCities, setScene, scene } =
    useROKStore();
  const [timer, setTimer] = useState(30);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && selectedCity && !isLocked) {
      handleAutoLockCity();
    }
  }, [timer, isLocked]);

  useEffect(() => {
    if (isLocked && timer === 0) {
      const waitForSceneChange = setTimeout(() => {
        setScene("attacker");
      }, 3000);

      return () => clearTimeout(waitForSceneChange);
    }
  }, [isLocked, timer]);

  const handleCityClick = (row: number, col: number) => {
    if (!isLocked && cities[row][col].ownedBy === null) {
      setSelectedCity({ row, col });
    }
  };

  const handleAutoLockCity = () => {
    if (selectedCity) {
      const updatedCities = [...cities];
      updatedCities[selectedCity.row][selectedCity.col].ownedBy = "Your teamm";
      setCities(updatedCities);
      setIsLocked(true);
    }
  };

  const handleUnlockCity = () => {
    if (selectedCity) {
      const updatedCities = [...cities];
      updatedCities[selectedCity.row][selectedCity.col].ownedBy = null;
      setCities(updatedCities);
      setSelectedCity(null);
      setIsLocked(false);
    }
  };

  return (
    <Flex direction={"column"} justify={"center"} align={"center"} p={4}>
      <Text fontSize={48} fontWeight={600}>
        Rise of kingdom, scene: {scene}
      </Text>
      <Text mb={2}>Time left: {timer} second</Text>


      <Box mt={8}>
        <Grid templateColumns="repeat(9, 1fr)" gap={2}>
          {cities.map((row, rowIndex) =>
            row.map((city, colIndex) => (
              <Box
                key={`${rowIndex}-${colIndex}`}
                bg={
                  city.ownedBy
                    ? city.ownedBy === "Your Team"
                      ? "green.200"
                      : "gray.500"
                    : "gray.200"
                }
                p={4}
                textAlign="center"
                onClick={() => handleCityClick(rowIndex, colIndex)}
                cursor={
                  city.ownedBy === null && !isLocked ? "pointer" : "not-allowed"
                }
                border={
                  selectedCity &&
                  selectedCity.row === rowIndex &&
                  selectedCity.col === colIndex
                    ? "2px solid blue"
                    : "none"
                }
              >
                <Text>{city.resources} resources</Text>
                <Text>
                  {city.ownedBy ? `Owned by: ${city.ownedBy}` : "Unclaimed"}
                </Text>
              </Box>
            ))
          )}
        </Grid>

        {isLocked ? (
          <Button mt={4} onClick={handleUnlockCity} disabled={timer === 0}>
            Unlock CCity
          </Button>
        ) : (
          <Button
            mt={4}
            onClick={handleAutoLockCity}
            disabled={!selectedCity || timer === 0}
          >
            Lock City
          </Button>
        )}
      </Box>
    </Flex>
  );
}
