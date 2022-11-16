FILE=$1
WIDTH=$(head -1 $FILE | tr ' ' '\n' | grep -E '\bW' | tr -d 'W')
HEIGHT=$(head -1 $FILE | tr ' ' '\n' | grep -E '\bH' | tr -d 'H')
FPS_NUM=$(grep -o -a -m 1 -P "(?<=F)([0-9]+)(?=:[0-9]+)" "$FILE")
FPS_DEN=$(grep -o -a -m 1 -P "(?<=F$FPS_NUM:)([0-9]+)" "$FILE")
echo -n $FPS_NUM/$FPS_DEN,${WIDTH}x${HEIGHT}
