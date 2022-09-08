const beats: {[index: string]: string} = {  //this index signature states that when a 'beats' is indexed with a string, it will return a string.
    'scissors': 'paper',
    'paper': 'rock',
    'rock': 'scissors',
  }
  
  export function rps(p1: string, p2: string): string{
    if (p1 === p2) return 'Draw!'
    
    if (beats[p1] == p2) return 'Player 1 won!' //if indexed p1 are different than 2 return the indexed value
    return 'Player 2 won!'  //all the indexed conditions are memorized on 'beats' here you just have to make one condition.
  }