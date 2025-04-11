import {
  Box,
  Button,
  Flex,
  For,
  Heading,
  SimpleGrid,
  Spinner,
  Tag,
} from "@chakra-ui/react";
import useSWR from "swr";
import { fetchMatrix, requestAttackCity } from "@/lib/games/rok";
import { RokCity } from "@/types/games/rok/rok-city.types";
import { Tooltip } from "@/components/ui/tooltip";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";

const OWNED_CITY_COLOR = "red";
const MY_CITY_COLOR = "blue";
const DEFAULT_CITY_COLOR = "teal";

export default function ChoosingCityView() {
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
    <Box>
      <Heading textAlign="center" mb="8">
        Hãy chọn một thành phố để tấn công
      </Heading>

      <SimpleGrid columns={9} gap={1}>
        <For each={data}>
          {(city) => <CityButton city={city} key={city.cityId} />}
        </For>
      </SimpleGrid>

      <Flex gap={2} mt="8" justify="center">
        <Tag.Root colorPalette={DEFAULT_CITY_COLOR}>
          <Tag.Label>Thành phố chưa bị chiếm</Tag.Label>
        </Tag.Root>

        <Tag.Root colorPalette={MY_CITY_COLOR}>
          <Tag.Label>Thành phố của bạn</Tag.Label>
        </Tag.Root>

        <Tag.Root colorPalette={OWNED_CITY_COLOR}>
          <Tag.Label>Thành phố của đối thủ</Tag.Label>
        </Tag.Root>
      </Flex>
    </Box>
  );
}

function CityButton({ city }: { city: RokCity }) {
  const { user } = useCurrentUser();

  const bgColor = city.owner
    ? city.owner === user?.username
      ? MY_CITY_COLOR
      : OWNED_CITY_COLOR
    : DEFAULT_CITY_COLOR;

  return (
    <Tooltip content={city.owner ?? "Trống"} openDelay={50}>
      <Button
        aspectRatio={1}
        key={city.cityId}
        bg={bgColor}
        textAlign="center"
        size="lg"
        onClick={() => requestAttackCity(city.cityId)}
      >
        {city.points}
      </Button>
    </Tooltip>
  );
}
