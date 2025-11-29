// My Courses Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
  initCourseTabs();
  initIcons();
  initVideoPlayer();
});

function initIcons() {
  // Initialize Lucide icons after they're loaded
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  } else {
    // Retry if lucide is not ready yet
    setTimeout(initIcons, 100);
  }
}

function initCourseTabs() {
  const tabMenus = document.querySelectorAll('.tab-menu');
  const tabContents = document.querySelectorAll('.tab-content');

  tabMenus.forEach(function (tabMenu) {
    tabMenu.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tab');

      // Remove active class from all tabs
      tabMenus.forEach(function (menu) {
        menu.classList.remove('active');
        menu.classList.remove('bg-[#ae873e]', 'text-white');
        menu.classList.add('bg-[#FFF9F2]', 'text-[#ae873e]');
      });

      // Add active class to clicked tab
      this.classList.add('active');
      this.classList.add('bg-[#ae873e]', 'text-white');
      this.classList.remove('bg-[#FFF9F2]', 'text-[#ae873e]');

      // Hide all tab contents
      tabContents.forEach(function (content) {
        content.classList.remove('active');
      });

      // Show target tab content
      const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
      if (targetContent) {
        targetContent.classList.add('active');
        filterCoursesByStatus(targetTab);
      }
    });
  });
}

function filterCoursesByStatus(status) {
  // Get all courses from the "all" tab
  const allTabContent = document.querySelector('[data-tab-content="all"]');
  const allCourses = allTabContent ? allTabContent.querySelectorAll('.course-card') : [];
  
  const targetContent = document.querySelector(`[data-tab-content="${status}"]`);
  const coursesList = targetContent ? targetContent.querySelector('.courses-list') : null;

  if (!coursesList) return;

  // Clear existing content
  coursesList.innerHTML = '';

  // Filter and append courses
  let hasCourses = false;
  allCourses.forEach(function (card) {
    const cardStatus = card.getAttribute('data-status');
    
    if (status === 'all' || cardStatus === status) {
      const clonedCard = card.cloneNode(true);
      coursesList.appendChild(clonedCard);
      hasCourses = true;
    }
  });

  // Reinitialize icons for cloned elements
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Show empty state if no courses
  if (!hasCourses && status !== 'all') {
    showEmptyState(coursesList, status);
  }
}

function showEmptyState(container, status) {
  const statusMessages = {
    'in-progress': 'Bạn chưa có khóa học nào đang học',
    'completed': 'Bạn chưa hoàn thành khóa học nào',
    'not-started': 'Bạn chưa có khóa học nào chưa bắt đầu'
  };

  const message = statusMessages[status] || 'Không có khóa học nào';

  const emptyState = document.createElement('div');
  emptyState.className = 'courses-empty-state w-full';
  emptyState.innerHTML = `
    <div class="flex flex-col items-center justify-center py-12">
      <i data-lucide="book-open" class="w-16 h-16 text-[#ececf0] mb-4"></i>
      <h3 class="text-[#666666] text-lg mb-2">${message}</h3>
      <p class="text-[#999999] text-sm">Hãy đăng ký khóa học để bắt đầu học tập</p>
      <a href="courses.html" class="mt-4 px-6 py-2.5 bg-[#ae873e] text-white rounded-lg text-[14px] hover:bg-[#c9a961] transition-all duration-300">
        Xem Khóa Học
      </a>
    </div>
  `;
  container.appendChild(emptyState);

  // Initialize icons for empty state
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function initVideoPlayer() {
  const videoItems = document.querySelectorAll('.video-item');
  const videoModal = document.getElementById('video-modal');
  const videoModalClose = document.getElementById('video-modal-close');
  const videoModalIframe = document.getElementById('video-modal-iframe');
  const videoModalTitle = document.getElementById('video-modal-title');
  const videoThumbnails = document.querySelectorAll('.video-thumbnail, .video-play-overlay');
  const videoPlayBtns = document.querySelectorAll('.video-play-btn');

  // Function to open video modal
  function openVideoModal(videoUrl, videoTitle) {
    if (!videoModal || !videoModalIframe || !videoModalTitle) return;
    
    videoModalTitle.textContent = videoTitle || 'Video';
    videoModalIframe.src = videoUrl;
    videoModal.classList.remove('hidden');
    videoModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    // Reinitialize icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Function to close video modal
  function closeVideoModal() {
    if (!videoModal || !videoModalIframe) return;
    
    videoModal.classList.add('hidden');
    videoModal.classList.remove('flex');
    videoModalIframe.src = '';
    document.body.style.overflow = '';
  }

  // Add click event to video items (thumbnail and play overlay)
  videoThumbnails.forEach(function (thumbnail) {
    thumbnail.addEventListener('click', function (e) {
      e.stopPropagation();
      const videoItem = this.closest('.video-item');
      if (videoItem) {
        const videoUrl = videoItem.getAttribute('data-video-url');
        const videoTitle = videoItem.getAttribute('data-video-title');
        if (videoUrl) {
          openVideoModal(videoUrl, videoTitle);
        }
      }
    });
  });

  // Add click event to play buttons
  videoPlayBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const videoItem = this.closest('.video-item');
      if (videoItem) {
        const videoUrl = videoItem.getAttribute('data-video-url');
        const videoTitle = videoItem.getAttribute('data-video-title');
        if (videoUrl) {
          openVideoModal(videoUrl, videoTitle);
        }
      }
    });
  });

  // Close modal when clicking close button
  if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
  }

  // Close modal when clicking outside
  if (videoModal) {
    videoModal.addEventListener('click', function (e) {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && videoModal && !videoModal.classList.contains('hidden')) {
      closeVideoModal();
    }
  });
}

