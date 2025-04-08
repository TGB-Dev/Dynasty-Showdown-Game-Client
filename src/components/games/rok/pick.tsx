import { useState } from "react";
import { useROKStore } from "@/hooks/games/rok";
import { Flex, Grid, Box, Button, Text } from "@chakra-ui/react";
import CountDown from "./countDown";

export default function Pick() {
  const { cities, selectedCity, setSelectedCity, setCities, setScene, scene, currentTeam } =
    useROKStore();
  const [isLocked, setIsLocked] = useState(false);

  const handleCityClick = (row: number, col: number) => {
    if (!isLocked && cities[row][col].ownedBy === null) {
      setSelectedCity({ row, col });
    }
  };

  const selectNextAvailableCity = () => {
    for (let i = 0; i < cities.length; i++) {
      for (let j = 0; j < cities[i].length; j++) {
        if (cities[i][j].ownedBy === null) {
          setSelectedCity({ row: i, col: j });
          return { row: i, col: j };
        }
      }
    }
    return null;
  };

  const handleAutoLockCity = () => {
    let cityToLock = selectedCity;
  
    // If no city is selected, choose the next available one
    if (!selectedCity) {
      cityToLock = selectNextAvailableCity();
    }
  
    if (cityToLock) {
      const updatedCities = [...cities];
      updatedCities[cityToLock.row][cityToLock.col].ownedBy = currentTeam;
      setCities(updatedCities);
      setIsLocked(true);
      setTimeout(() => {
        setScene("attacker");
      }, 2000);
    }
  };  

  const handleUnlockCity = () => {
    if (selectedCity) {
      const updatedCities = [...cities];
      updatedCities[selectedCity.row][selectedCity.col].ownedBy = null;
      setCities(updatedCities);
      setSelectedCity(null);
      setIsLocked(false);
    } else {
      for (let i = 0; i < cities.length; i++) {
        for (let j = 0; j < cities[i].length; j++) {
          if (cities[i][j].ownedBy === null) {
            setSelectedCity({ row: i, col: j });
            const updatedCities = [...cities];
            updatedCities[i][j].ownedBy = currentTeam;
            setCities(updatedCities);
            setIsLocked(true);
            return;
          }
        }
      }
    }
  };

  return (
    <Flex direction={"column"} justify={"center"} align={"center"} p={4}>
      <Text fontSize={{ base: 32, md: 48 }} fontWeight={600}>
        Rise of kingdom, scene: {scene}
      </Text>

      <CountDown
        seconds={30}
        callback={handleAutoLockCity}
        color="black"
        textSize={24}
      />

      <Box mt={8}>
        <Grid
          templateColumns={{
            base: "repeat(3, 1fr)",
            md: "repeat(6, 1fr)",
            lg: "repeat(9, 1fr)",
          }}
          gap={2}
        >
          {cities.map((row, rowIndex) =>
            row.map((city, colIndex) => (
              <Box
                key={`${rowIndex}-${colIndex}`}
                bg={
                  city.ownedBy === currentTeam
                  ? "green.200"
                  : city.ownedBy
                  ? "gray.500"
                  : "gray.200"
                }
                p={{ base: 2, md: 4 }}
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
          <Button mt={4} onClick={handleUnlockCity}>
            Unlock City
          </Button>
        ) : (
          <Button mt={4} onClick={handleAutoLockCity} disabled={!selectedCity}>
            Lock City
          </Button>
        )}
      </Box>
    </Flex>
  );
}
