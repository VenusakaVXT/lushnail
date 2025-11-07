// My Orders Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
  initOrderItemsShowMore();
});

function initOrderItemsShowMore() {
  const orderCards = document.querySelectorAll('.order-card');

  orderCards.forEach(function (orderCard) {
    const itemsContainer = orderCard.querySelector('.order-items-container');
    if (!itemsContainer) return;

    const allItems = itemsContainer.querySelectorAll('.order-item');
    const showMoreWrapper = orderCard.querySelector('.order-show-more-wrapper');
    const showMoreBtn = orderCard.querySelector('.order-show-more-btn');

    if (!showMoreWrapper || !showMoreBtn || allItems.length === 0) return;

    const totalItems = allItems.length;
    const maxVisibleItems = 3;

    if (totalItems > maxVisibleItems) {
      allItems.forEach(function (item, index) {
        if (index >= maxVisibleItems) {
          item.classList.add('order-item-hidden');
        }
      });

      showMoreWrapper.classList.remove('hidden');

      let isExpanded = false;

      showMoreBtn.addEventListener('click', function () {
        const iconElement = showMoreBtn.querySelector('i[data-lucide]');
        const textNodes = Array.from(showMoreBtn.childNodes).filter(function (node) {
          return node.nodeType === Node.TEXT_NODE;
        });
        const textNode = textNodes[0];

        if (isExpanded) {
          allItems.forEach(function (item, index) {
            if (index >= maxVisibleItems) {
              item.classList.add('order-item-hidden');
            }
          });
          if (textNode) {
            textNode.textContent = 'Xem thêm sản phẩm ';
          }
          if (iconElement) {
            iconElement.classList.remove('rotate-180');
          }
          isExpanded = false;
        } else {
          allItems.forEach(function (item) {
            item.classList.remove('order-item-hidden');
          });
          if (textNode) {
            textNode.textContent = 'Ẩn bớt sản phẩm ';
          }
          if (iconElement) {
            iconElement.classList.add('rotate-180');
          }
          isExpanded = true;
        }
      });
    }
  });
}
