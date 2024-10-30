import { useGameStore } from "../../store/gameStore";
import { SettingsBarElement } from "../../types/types";
import { LeftExtension, Li, Separator } from "./components";

interface Props {
  selected: SettingsBarElement | null;
  togglePunctuationEnabled: () => void;
  toggleNumbersEnabled: () => void;
}

export const PunctuationAndNumbers = ({
  selected,
  togglePunctuationEnabled,
  toggleNumbersEnabled
}: Props) => {
  const { punctuationEnabled, numbersEnabled } = useGameStore(state => state);

  return (
      selected && (
      <LeftExtension
      $visible={selected.punctuationAndNumbers}
      >
        <Li
          onClick={() => togglePunctuationEnabled()}
          $selected={punctuationEnabled}

        >
          punctuation
        </Li>
        <Li
          onClick={() => toggleNumbersEnabled()}
          $selected={numbersEnabled}
        >
          numbers
        </Li>
        <Separator />
      </LeftExtension>
      )
  )
};
