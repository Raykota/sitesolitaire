



class Box
{


constructor(isEmpty, isPlayable, row, col)
{
this.isEmpty = isEmpty;
this.isPlayable = isPlayable;
this.row = row;
this.col = col;
}

isEmpty()
{
    return this.isEmpty;
}

isPlayable()
{
    return this.isPlayable;
}

emptyIt()
{
    this.isEmpty = true;
    }

fillIt()
{
    this.isEmpty = false;
}
}