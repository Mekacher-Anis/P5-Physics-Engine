var arr1 = [5, 3, 2, 6, 7, 9, 1, 0, -1, -7, 10, 8];
var arr2 = [5, 3, 2, 6, 7, 9, 1, 0, -1, -7, 10, 8];
var arr3 = [5, 3, 2, 6, 7, 9, 1, 0, -1, -7, 10, 8];
var arr5 = [5, 3, 2, 6, 7, 9, 1, 0, -1, -7, 10, 8];
var arr6 = [2, 3, 8, 6, 1];

var inv = 0;
//console.log("Array before sorting ", arr1);
MergeSort(arr6);
console.log(inv);


// window.onload = () => {

//     for (let i = 5; i < 18; i++) {
//         let data = {
//             labels: [],
//             series: [
//                 [],
//                 []
//             ]
//         };
//         let size = Math.pow(2, i);
//         let k = 2;
//         for (let j = 0; j < 12; j++, k += Math.floor(size / (12 * 2))) {
//             data.labels.push(k);
//             let arr = [];
//             //initialize array
//             console.log('Initializing array of size : ', size);
//             for (let i = 0; i < size; i++)
//                 arr.push(Math.random() * 1000);
//             //sort array with normal merge sort
//             console.log('Sorting array with Merge sort');
//             let arr1 = arr.slice(0, arr.length);
//             let tb1 = performance.now();
//             MergeSort(arr1);
//             let te1 = performance.now();
//             data.series[0].push(te1 - tb1);
//             //sort array with hybrid merge sort
//             console.log('Sorting array with Hybrid Merge sort');
//             arr1 = arr.slice(0, arr.length);
//             let tb2 = performance.now();
//             hybridMergeInsertionSort(arr1);
//             let te2 = performance.now();
//             data.series[1].push(te2 - tb2);
//         }

//         let title = document.createElement('h1');
//         title.appendChild(document.createTextNode('For n = ' + size));
//         document.body.appendChild(title);
//         let div = document.createElement('div');
//         div.id = 'graph_' + i;
//         div.className = "ct-chart";
//         document.body.appendChild(div);
//         new Chartist.Line('#graph_' + i, data, {
//             width: 720,
//             height: 405
//         });
//     }
// }


//O(n^2)
function BubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let noSwaps = true;
        for (let j = arr.length; j > i; j--)
            if (arr[j] < arr[j - 1]) {
                arr[j - 1] = [arr[j], arr[j] = arr[j - 1]][0];
                noSwaps = false;
            }

        if (noSwaps)
            break;
    }
}


//O(n^2)
function SelectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++)
            if (arr[j] < arr[min])
                min = j;
        arr[i] = [arr[min], arr[min] = arr[i]][0];
    }
}

//O(n^2)
function InsertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const ele = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > ele) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = ele;
    }
}

function InsertionSortSub(arr, b, e) {
    for (let i = b + 1; i < e + 1; i++) {
        const ele = arr[i];
        let j = i - 1;
        while (j >= b && arr[j] > ele) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = ele;
    }
}

//convenience function
function RecurInsertionSort(arr) {
    recur_insertion_sort(arr, 0, arr.length - 1);
}

function recur_insertion_sort(arr, b, e) {
    if (b < e) {
        //recursively sort arr[b.. e-1]
        recur_insertion_sort(arr, b, e - 1);
        //insert arr[e] into the already sorted arr[b.. e-1]
        const ele = arr[e];
        let j = e - 1;
        while (j >= 0 && arr[j] > ele) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = ele;
    }
}

//convenience function
function MergeSort(arr) {
    merge_sort(arr, 0, arr.length - 1);
}

function Merge(arr, a, b, c) {
    let arr1 = arr.slice(a, b + 1);
    arr1.push(Infinity);
    let arr2 = arr.slice(b + 1, c + 1);
    arr2.push(Infinity);

    let j = 0,
        k = 0;

    for (let i = a; i <= c; i++) {
        if (arr1[j] < arr2[k])
            arr[i] = arr1[j++];
        else {
            arr[i] = arr2[k++];
            inv++;
        }
    }
}

//O(nlogn)
function merge_sort(arr, b, e) {
    if (b < e) {
        let q = Math.floor((b + e) / 2)
        merge_sort(arr, b, q);
        merge_sort(arr, q + 1, e);
        Merge(arr, b, q, e);
    }
}

//O(nk+nlog(n/k))
function hybridMergeInsertionSort(arr, k) {
    hybrid_merge_ins_sort(arr, 0, arr.length - 1, k);
}

function hybrid_merge_ins_sort(arr, b, e, k) {
    if ((e - b + 1) > k) {
        let q = Math.floor((b + e) / 2)
        hybrid_merge_ins_sort(arr, b, q, k);
        hybrid_merge_ins_sort(arr, q + 1, e, k);
        Merge(arr, b, q, e);
    } else {
        InsertionSortSub(arr, b, e);
    }
}

//O(n)
function LinearSearch(val, arr) {
    let j = 0;
    while (j++ < arr.length && arr[j] != val);
    return (j < arr.length) ? j : -1;
}

//O(logn)
function BinarySearch(val, arr) {
    let l = 0,
        r = arr.length - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if (arr[mid] == val)
            return mid;
        else if (arr[mid] < val)
            l = mid + 1;
        else
            r = mid - 1;
    }
    return -1;
}

//O(nlogn)
function areThere2ValWithSum(arr, val) {
    MergeSort(arr); //nlogn
    for (let i = 0; i < arr.length; i++) //n
        if (BinarySearch(val - arr[i], arr) != -1) //logn
            return true;
}