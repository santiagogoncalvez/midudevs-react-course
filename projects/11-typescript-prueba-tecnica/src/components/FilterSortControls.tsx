import { Group, Button, TextInput, Stack } from '@mantine/core';
import {
  IconSearch,
  IconRefresh,
  IconArrowsSort,
  IconColorPicker,
} from '@tabler/icons-react';
import { SortBy } from '../types.d';

interface Props {
  sorting: SortBy;
  toggleColors: () => void;
  showColors: boolean;
  toggleSortByCountry: () => void;
  handleReset: () => void;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function FilterSortControls({
  sorting,
  toggleColors,
  showColors,
  toggleSortByCountry,
  handleReset,
  onChangeInput,
}: Props) {
  return (
    <Stack mb="xl">
      <Group justify="space-between" align="flex-end">
        {/* Grupo de Acciones */}
        <Group>
          <Button
            variant={showColors ? 'filled' : 'light'}
            color="blue"
            onClick={toggleColors}
            leftSection={<IconColorPicker size={16} />}
          >
            Colorear filas
          </Button>

          <Button
            variant={sorting === SortBy.COUNTRY ? 'filled' : 'light'}
            color="teal"
            onClick={toggleSortByCountry}
            leftSection={<IconArrowsSort size={16} />}
          >
            {sorting === SortBy.COUNTRY
              ? 'No ordenar por país'
              : 'Ordenar por país'}
          </Button>

          <Button
            variant="outline"
            color="gray"
            onClick={handleReset}
            leftSection={<IconRefresh size={16} />}
          >
            Resetear estado
          </Button>
        </Group>

        {/* Filtro de búsqueda */}
        <TextInput
          placeholder="Filtra por país..."
          leftSection={<IconSearch size={16} />}
          onChange={onChangeInput}
          style={{ flex: 1, maxWidth: '300px' }}
        />
      </Group>
    </Stack>
  );
}

export default FilterSortControls;
