const merge = (fieldToSort, arrayOfElements, left, middle, right) => {
    let n1 = middle - left + 1;
    let n2 = right - middle;

    let tempLeftArray = new Array(n1);
    let tempRightArray = new Array(n2);

    for (let i = 0; i < n1; i++)
        tempLeftArray[i] = arrayOfElements[left + i];
    for (let j = 0; j < n2; j++)
        tempRightArray[j] = arrayOfElements[middle + 1 + j];

    let i = 0;
    let j = 0;

    let k = left;

    while (i < n1 && j < n2) {
        if (tempLeftArray[i][fieldToSort] <= tempRightArray[j][fieldToSort]) {
            arrayOfElements[k] = tempLeftArray[i];
            i++;
        }
        else {
            arrayOfElements[k] = tempRightArray[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arrayOfElements[k] = tempLeftArray[i];
        i++;
        k++;
    }

    while (j < n2) {
        arrayOfElements[k] = tempRightArray[j];
        j++;
        k++;
    }
}

export const mergeSort = (fieldToSort, arrayOfElements, left, right) => {
    if (left >= right) {
        return;
    }
    let middle = left + parseInt((right - left) / 2);
    mergeSort(fieldToSort, arrayOfElements, left, middle);
    mergeSort(fieldToSort, arrayOfElements, middle + 1, right);
    merge(fieldToSort, arrayOfElements, left, middle, right);
}