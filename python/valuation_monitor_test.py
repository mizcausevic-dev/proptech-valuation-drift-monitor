import unittest

from valuation_monitor import PropertyAsset, posture, score_asset


class ValuationMonitorTest(unittest.TestCase):
    def test_reprice_asset(self) -> None:
        asset = PropertyAsset("urban-mixed-use-12", 48200000, 43800000, 41, 7.8, 82, 3)
        self.assertEqual(posture(score_asset(asset)), "reprice")

    def test_watch_asset(self) -> None:
        asset = PropertyAsset("industrial-flex-west", 31700000, 30500000, 16, 2.4, 26, 1)
        self.assertEqual(posture(score_asset(asset)), "watch")


if __name__ == "__main__":
    unittest.main()
