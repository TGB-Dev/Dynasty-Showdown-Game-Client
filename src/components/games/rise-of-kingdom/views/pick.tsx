import { Button, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import useSWR from "swr";
import { fetchMatrix } from "@/lib/games/rok";
import { RokCity } from "@/types/games/rok/rok-city.types";
import { Tooltip } from "@/components/ui/tooltip";

export default function Pick() {
  return (
    <Flex justify="center" align="center" minH="100vh">
      <CityGrid />
    </Flex>
  );
}

function CityGrid() {
  const { data } = useSWR("/rok/matrix", fetchMatrix);

  if (!data) {
    return <Spinner />;
  }

  return (
    <SimpleGrid columns={9} gap={1}>
      {data.map((city) => (
        <CityButton city={city} key={city.cityId} />
      ))}
    </SimpleGrid>
  );
}

function CityButton({ city }: { city: RokCity }) {
  return (
    <Tooltip content={city.owner ?? "Trống"} openDelay={50}>
      <Button
        aspectRatio={1}
        key={city.cityId}
        p="4"
        textAlign="center"
        size="lg"
      >
        {city.points}
      </Button>
    </Tooltip>
  );
}
