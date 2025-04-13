"use client";

import { Button, Drawer, Portal, Spinner, Table } from "@chakra-ui/react";
import useSWR from "swr";
import { requests } from "@/lib/requests";
import { LeaderboardDto } from "@/types/leaderboard.dto";

const fetch = () => {
  return requests.get<LeaderboardDto[]>("/user/all").then((res) => res.data);
};

export default function Leaderboard() {
  const { data } = useSWR("/user/all", fetch);

  if (!data) {
    return <Spinner />;
  }

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm" position="fixed" top={4} right={4}>
          Bảng xếp hạng
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Bảng xếp hạng</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Hạng</Table.ColumnHeader>
                    <Table.ColumnHeader>Người chơi</Table.ColumnHeader>
                    <Table.ColumnHeader>Điểm</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {data.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{index}</Table.Cell>
                      <Table.Cell>{item.username}</Table.Cell>
                      <Table.Cell>{item.score}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
