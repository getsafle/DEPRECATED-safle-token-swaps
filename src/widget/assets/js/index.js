export function WidgetJS() {
  return `document.addEventListener('initCustomSelectDesign', function (e) {
    let tsCustomSelectElements,
      totalTsSelect,
      currentTsSelectOptionsCount,
      currentTsSelect,
      selectedOption,
      allOptions,
      optionItem;
  
    /* Look for any elements with the class "ts-custom-select": */
    tsCustomSelectElements = document.getElementsByClassName('ts-custom-select');
    totalTsSelect = tsCustomSelectElements.length;
  
    // Remove declared active class.
    const selectedElement = document.getElementsByClassName('select-selected');
    while (selectedElement.length > 0) selectedElement[0].remove();
  
    for (let i = 0; i < totalTsSelect; i++) {
      currentTsSelect = tsCustomSelectElements[i].getElementsByTagName(
        'select'
      )[0];
      currentTsSelectOptionsCount = currentTsSelect.length;
      let defaultSelectedValue = currentTsSelect.value;
  
      /* For each element, create a new DIV that will act as the selected item: */
      selectedOption = document.createElement('DIV');
      selectedOption.setAttribute('class', 'select-selected');
      selectedOption.innerHTML =
        currentTsSelect.options[currentTsSelect.selectedIndex].innerHTML;
      tsCustomSelectElements[i].appendChild(selectedOption);
  
      /* For each element, create a new DIV that will contain the option list: */
      allOptions = document.createElement('DIV');
      allOptions.setAttribute('class', 'select-items select-hide');
  
      for (let j = 0; j < currentTsSelectOptionsCount; j++) {
        /* For each option in the original select element,
          create a new DIV that will act as an option item: */
        let parentOptionInnerHtml = currentTsSelect.options[j].innerHTML;
        optionItem = document.createElement('DIV');
        optionItem.innerHTML = parentOptionInnerHtml;
  
        if (parentOptionInnerHtml == defaultSelectedValue) {
          optionItem.setAttribute('class', 'same-as-selected');
        }
  
        optionItem.addEventListener('click', function (e) {
          /* When an item is clicked, update the original select box,
            and the selected item: */
          let selectOptionOnDiv,
            clickedTsSelect,
            selectedDivElement,
            clickedTsSelectOptionCount,
            selectOptionOnDivLength;
  
          clickedTsSelect = this.parentNode.parentNode.getElementsByTagName(
            'select'
          )[0];
  
          clickedTsSelect.value = this.innerHTML;
          clickedTsSelect.onchange();
  
          clickedTsSelectOptionCount = clickedTsSelect.length;
          selectedDivElement = this.parentNode.previousSibling;
  
          for (let i = 0; i < clickedTsSelectOptionCount; i++) {
            if (clickedTsSelect.options[i].innerHTML == this.innerHTML) {
              clickedTsSelect.selectedIndex = i;
              selectedDivElement.innerHTML = this.innerHTML;
              selectOptionOnDiv = this.parentNode.getElementsByClassName(
                'same-as-selected'
              );
  
              selectOptionOnDivLength = selectOptionOnDiv.length;
              for (let k = 0; k < selectOptionOnDivLength; k++) {
                selectOptionOnDiv[k].removeAttribute('class');
              }
              this.setAttribute('class', 'same-as-selected');
              break;
            }
          }
          selectedDivElement.click();
        });
  
        allOptions.appendChild(optionItem);
      }
  
      tsCustomSelectElements[i].appendChild(allOptions);
  
      selectedOption.addEventListener('click', function (e) {
        /* When the select box is clicked, close any other select boxes,
          and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle('select-hide');
        this.classList.toggle('select-arrow-active');
      });
    }
  
    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
        except the current select box: */
      var selectItems,
        selectSelected,
        selectItemsLength,
        selectSelectedLength,
        arrNo = [];
  
      selectItems = document.getElementsByClassName('select-items');
      selectSelected = document.getElementsByClassName('select-selected');
      selectItemsLength = selectItems.length;
      selectSelectedLength = selectSelected.length;
  
      for (let i = 0; i < selectSelectedLength; i++) {
        if (elmnt == selectSelected[i]) {
          arrNo.push(i);
        } else {
          selectSelected[i].classList.remove('select-arrow-active');
        }
      }
  
      for (let i = 0; i < selectItemsLength; i++) {
        if (arrNo.indexOf(i)) {
          selectItems[i].classList.add('select-hide');
        }
      }
    }
  
    /* If the user clicks anywhere outside the select box,
      then close all select boxes: */
    document.addEventListener('click', closeAllSelect);
  });
  
  var selectCustomDesign = new CustomEvent('initCustomSelectDesign', {});
  document.dispatchEvent(selectCustomDesign);`;
}
