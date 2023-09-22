import React from 'react'

export default function Showtimes() {
  return (
		<div class="row">
			<div class="col-3">
				<div
					class="nav flex-column nav-pills"
					id="v-pills-tab"
					role="tablist"
					aria-orientation="vertical"
				>
					<a
						class="nav-link text-capitalize active"
						data-toggle="pill"
						href="#galaxy"
						role="tab"
						aria-selected="true"
					>
						Galaxy Cinema
					</a>
					<a
						class="nav-link text-capitalize"
						data-toggle="pill"
						href="#bhd"
						role="tab"
						aria-selected="false"
					>
						BHD Star
					</a>
				</div>
			</div>
			<div class="col-9">
				<div class="tab-content" id="v-pills-tabContent">
					<div
						class="tab-pane fade show active"
						id="galaxy"
						role="tabpanel"
					>
						<div class="row mb-5">
							<div class="col-1">
								<img
									class="img-fluid rounded"
									src="https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png"
								/>
							</div>
							<div class="col-11 pl-0">
								<h5>Galaxy Cinema Cineplex - 3/2</h5>
								<span class="text-muted">
									L5-Vincom 3/2, 3C Đường 3/2, Q.10
								</span>
							</div>
							<div class="col-12">
								<div class="row">
									<div class="col-3">
										<a href="">2022-12-12T09:30:00</a>
									</div>
									<div class="col-3">
										<a href="">2022-12-12T09:30:00</a>
									</div>
									<div class="col-3">
										<a href="">2022-12-12T09:30:00</a>
									</div>
									<div class="col-3">
										<a href="">2022-12-12T09:30:00</a>
									</div>
								</div>
							</div>
						</div>
						<div class="row mb-5">
							<div class="col-1">
								<img
									class="img-fluid rounded"
									src="https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png"
								/>
							</div>
							<div class="col-11 pl-0">
								<h5>
									Galaxy Cinema Cineplex - Vincom Thảo Điền
								</h5>
								<span class="text-muted">
									L5-Megamall, 159 XL Hà Nội, Q.2
								</span>
							</div>
							<div class="col-12">
								<div class="row">
									<div class="col-3">
										<a href="">2022-12-12T09:30:00</a>
									</div>
									<div class="col-3">
										<a href="">2022-05-12T18:12:23</a>
									</div>
									<div class="col-3">
										<a href="">2022-05-12T18:12:23</a>
									</div>
									<div class="col-3">
										<a href="">2022-05-12T18:12:23</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="tab-pane fade" id="bhd" role="tabpanel">
						...
					</div>
				</div>
			</div>
		</div>
  );
}
