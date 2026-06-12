<div class="btn-group bottom-sheet sg-topic-sort" component="thread/sort">
	<button class="btn btn-ghost btn-sm ff-secondary d-flex gap-2 align-items-center dropdown-toggle text-truncate sg-topic-sort-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="排序回复">
		<i class="fa fa-fw fa-arrow-down-wide-short"></i>
		<span class="fw-semibold text-truncate text-nowrap">排序</span>
	</button>

	<ul class="dropdown-menu p-1 text-sm sg-topic-sort-menu" role="menu">
		<li>
			<a class="dropdown-item rounded-1 d-flex align-items-center gap-2 oldest_to_newest" href="#" data-sort="oldest_to_newest" role="menuitem">
				<span class="flex-grow-1">从旧到新</span>
				<i class="flex-shrink-0 fa fa-fw text-secondary"></i>
			</a>
		</li>
		<li>
			<a class="dropdown-item rounded-1 d-flex align-items-center gap-2 newest_to_oldest" href="#" data-sort="newest_to_oldest" role="menuitem">
				<span class="flex-grow-1">从新到旧</span>
				<i class="flex-shrink-0 fa fa-fw text-secondary"></i>
			</a>
		</li>
		<li>
			<a class="dropdown-item rounded-1 d-flex align-items-center gap-2 most_votes" href="#" data-sort="most_votes" role="menuitem">
				<span class="flex-grow-1">按赞排序</span>
				<i class="flex-shrink-0 fa fa-fw text-secondary"></i>
			</a>
		</li>
	</ul>
</div>
