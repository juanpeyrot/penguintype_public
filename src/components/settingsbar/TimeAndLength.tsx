import { QuoteLength, TimeAmount, WordsQuantity, useGameStore } from "../../store/gameStore";
import { SettingsBarElement } from "../../types/types";
import { GAMEMODES } from "../../utils/constants";
import { Li, RightExtension, Separator } from "./components";

interface Props {
  selected: SettingsBarElement | null;
}

export const TimeAndLength = ({ selected }: Props) => {

  const { 
    gamemode, wordsQuantity, quoteLength, timeAmount,
    setWordsQuantity, setTimeAmount, setQuoteLength } = useGameStore(state => state);
  
  const handleClick = (value: number) => {
    if (gamemode === GAMEMODES.WORDS)
      return setWordsQuantity(value as unknown as WordsQuantity);
    else if (gamemode === GAMEMODES.TIME)
      return setTimeAmount(value as unknown as TimeAmount);
    else if (gamemode === GAMEMODES.QUOTE)
      return setQuoteLength(value as unknown as QuoteLength);
    else
      return;
  }

  return (
      selected && (
      <RightExtension
        $visible={selected.timeOrLength ? true : false}
        >
        <Separator/>

        {selected?.timeOrLength?.values.map((value: string) => {
          
          const selected = gamemode === GAMEMODES.WORDS 
          ? wordsQuantity
          : gamemode === GAMEMODES.QUOTE
            ? quoteLength
            : timeAmount; 
          
          return (
            <Li
            onClick={() => handleClick(parseInt(value))}
            key={crypto.randomUUID()}
            $selected={selected === parseInt(value)}
            >
              {value}
            </Li>
            )
        })}
      </RightExtension>
      )
  )
}
