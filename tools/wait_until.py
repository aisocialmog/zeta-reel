"""Sleep until the series' post time (IST) on the episode date; returns at once if that time has passed."""
import sys, time
from datetime import datetime, timedelta, timezone
from common import episode
_, _, sc, _, date = episode(sys.argv[1])
IST = timezone(timedelta(hours=5, minutes=30)); h, m = map(int, sc['post_time'].split(':'))
target = datetime.fromisoformat(date).replace(hour=h, minute=m, tzinfo=IST)
left = (target - datetime.now(IST)).total_seconds()
print(f'post time {target.isoformat()} · waiting {max(0, left) / 60:.0f} min', flush=True)
if left > 0: time.sleep(left)
